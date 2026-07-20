import argparse
import os
import shutil
import subprocess
import sys
import zipfile
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SERVER_ENV = PROJECT_ROOT / "server" / ".env"


def read_env(path):
    values = {}
    if not path.exists():
        return values

    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        values[key.strip()] = value.strip()

    return values


def restore_files(zip_path, destination):
    if not zip_path.exists():
        raise RuntimeError(f"Project backup zip not found: {zip_path}")

    destination.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(zip_path, "r") as zip_file:
        zip_file.extractall(destination)


def restore_database(sql_path):
    if not sql_path.exists():
        raise RuntimeError(f"Database backup SQL file not found: {sql_path}")

    env_values = read_env(SERVER_ENV)

    required = ["DBHOST", "DBUSER", "DBDATABASE", "DBPORT"]
    missing = [key for key in required if not env_values.get(key)]
    if missing:
        raise RuntimeError(f"Missing database settings in server/.env: {', '.join(missing)}")

    mysql = shutil.which("mysql")
    if not mysql:
        raise RuntimeError("mysql was not found. Install MySQL client tools first.")

    command = [
        mysql,
        "--host",
        env_values["DBHOST"],
        "--port",
        env_values["DBPORT"],
        "--user",
        env_values["DBUSER"],
        env_values["DBDATABASE"],
    ]

    process_env = os.environ.copy()
    if env_values.get("DBPASSWORD"):
        process_env["MYSQL_PWD"] = env_values["DBPASSWORD"]

    with sql_path.open("rb") as sql_file:
        result = subprocess.run(command, stdin=sql_file, stderr=subprocess.PIPE, env=process_env)

    if result.returncode != 0:
        error = result.stderr.decode("utf-8", errors="replace").strip()
        raise RuntimeError(f"Database restore failed: {error}")


def main():
    parser = argparse.ArgumentParser(description="Recover GitHero from a backup folder.")
    parser.add_argument("backup_folder", help="Path to a full-backup-* folder.")
    parser.add_argument(
        "--restore-files-to",
        default=None,
        help="Folder to extract project files into. If omitted, files are not restored.",
    )
    parser.add_argument(
        "--restore-db",
        action="store_true",
        help="Import githero-database.sql into the database from server/.env.",
    )
    args = parser.parse_args()

    backup_folder = Path(args.backup_folder).resolve()
    files_zip = backup_folder / "githero-project-files.zip"
    database_dump = backup_folder / "githero-database.sql"

    try:
        if args.restore_files_to:
            restore_files(files_zip, Path(args.restore_files_to).resolve())
            print(f"Project files restored to: {Path(args.restore_files_to).resolve()}")

        if args.restore_db:
            restore_database(database_dump)
            print("Database restored successfully.")

        if not args.restore_files_to and not args.restore_db:
            print("Nothing restored. Use --restore-files-to and/or --restore-db.")
    except Exception as exc:
        print(f"Recovery failed: {exc}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
