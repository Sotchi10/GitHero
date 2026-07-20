import argparse
import datetime as dt
import os
import shutil
import subprocess
import sys
import zipfile
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
BACKUP_ROOT = PROJECT_ROOT / "backups"
SERVER_ENV = PROJECT_ROOT / "server" / ".env"

EXCLUDED_DIRS = {
    ".git",
    ".vite",
    "backups",
    "node_modules",
    "dist",
}


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


def add_project_files(zip_file):
    for file_path in PROJECT_ROOT.rglob("*"):
        if file_path == zip_file:
            continue

        relative_parts = file_path.relative_to(PROJECT_ROOT).parts
        if any(part in EXCLUDED_DIRS for part in relative_parts):
            continue

        if file_path.is_file():
            zip_file.write(file_path, file_path.relative_to(PROJECT_ROOT))


def run_database_backup(output_file):
    env_values = read_env(SERVER_ENV)

    required = ["DBHOST", "DBUSER", "DBDATABASE", "DBPORT"]
    missing = [key for key in required if not env_values.get(key)]
    if missing:
        raise RuntimeError(f"Missing database settings in server/.env: {', '.join(missing)}")

    mysqldump = shutil.which("mysqldump")
    if not mysqldump:
        raise RuntimeError("mysqldump was not found. Install MySQL client tools first.")

    command = [
        mysqldump,
        "--single-transaction",
        "--routines",
        "--triggers",
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

    with output_file.open("wb") as dump_file:
        result = subprocess.run(command, stdout=dump_file, stderr=subprocess.PIPE, env=process_env)

    if result.returncode != 0:
        output_file.unlink(missing_ok=True)
        error = result.stderr.decode("utf-8", errors="replace").strip()
        raise RuntimeError(f"Database backup failed: {error}")


def main():
    parser = argparse.ArgumentParser(description="Create a full GitHero backup.")
    parser.add_argument(
        "--skip-db",
        action="store_true",
        help="Only back up project files, without running mysqldump.",
    )
    args = parser.parse_args()

    timestamp = dt.datetime.now().strftime("%Y%m%d-%H%M%S")
    backup_folder = BACKUP_ROOT / f"full-backup-{timestamp}"
    files_zip = backup_folder / "githero-project-files.zip"
    database_dump = backup_folder / "githero-database.sql"

    backup_folder.mkdir(parents=True, exist_ok=True)

    try:
        with zipfile.ZipFile(
            files_zip,
            "w",
            compression=zipfile.ZIP_DEFLATED,
            allowZip64=True,
        ) as zip_file:
            add_project_files(zip_file)

        if not args.skip_db:
            run_database_backup(database_dump)

        print("Backup completed successfully.")
        print(f"Backup folder: {backup_folder}")
        print(f"Project files: {files_zip}")
        if args.skip_db:
            print("Database dump: skipped")
        else:
            print(f"Database dump: {database_dump}")
    except Exception as exc:
        print(f"Backup failed: {exc}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
