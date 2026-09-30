#!/usr/bin/env python3
import os
import zipfile
import sys

def package_project():
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    public_dir = os.path.join(root_dir, 'public')
    os.makedirs(public_dir, exist_ok=True)
    zip_path = os.path.join(public_dir, 'barangay-bugo-system.zip')

    # Remove existing zip if present
    if os.path.exists(zip_path):
        os.remove(zip_path)

    ignored_dirs = {
        'node_modules',
        '.git',
        'dist',
        'build',
        'coverage',
        '.vite',
        '__pycache__'
    }

    ignored_files = {
        'barangay-bugo-system.zip',
        '.DS_Store'
    }

    print(f"Packaging project from: {root_dir}")
    print(f"Target archive: {zip_path}")

    file_count = 0
    with zipfile.ZipFile(zip_path, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=6) as zipf:
        for current_root, dirs, files in os.walk(root_dir):
            # Exclude ignored dirs in-place
            dirs[:] = [d for d in dirs if d not in ignored_dirs and not d.startswith('.git')]

            for file in files:
                if file in ignored_files or file.endswith('.pyc'):
                    continue

                full_path = os.path.join(current_root, file)
                rel_path = os.path.relpath(full_path, root_dir)

                # Skip if inside ignored dirs
                path_parts = rel_path.split(os.sep)
                if any(part in ignored_dirs for part in path_parts):
                    continue

                zipf.write(full_path, rel_path)
                file_count += 1

    file_size_mb = os.path.getsize(zip_path) / (1024 * 1024)
    print(f"Successfully packaged {file_count} files into {zip_path} ({file_size_mb:.2f} MB)")

if __name__ == '__main__':
    package_project()
