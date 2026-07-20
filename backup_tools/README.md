# GitHero Backup and Recovery

This folder contains Python scripts for project backup and recovery.

## Full Backup

Run from the `GitHero` folder:

```powershell
python .\backup_tools\full_backup.py
```

This creates:

- `backups/full-backup-YYYYMMDD-HHMMSS/githero-project-files.zip`
- `backups/full-backup-YYYYMMDD-HHMMSS/githero-database.sql`

The project zip excludes generated folders:

- `.git`
- `.vite`
- `backups`
- `node_modules`
- `dist`

If you only want to back up files and skip the database:

```powershell
python .\backup_tools\full_backup.py --skip-db
```

## Recovery

Restore project files into another folder:

```powershell
python .\backup_tools\recover_backup.py .\backups\full-backup-YYYYMMDD-HHMMSS --restore-files-to .\restore
```

Restore the database:

```powershell
python .\backup_tools\recover_backup.py .\backups\full-backup-YYYYMMDD-HHMMSS --restore-db
```

Restore both files and database:

```powershell
python .\backup_tools\recover_backup.py .\backups\full-backup-YYYYMMDD-HHMMSS --restore-files-to .\restore --restore-db
```

## Requirements

- Python 3
- MySQL client tools installed, so `mysqldump` and `mysql` are available in the terminal
- Correct database settings in `server/.env`

After restoring files, install dependencies again:

```powershell
cd .\restore\client
npm install

cd ..\server
npm install
```
