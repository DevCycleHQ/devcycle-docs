# Offline variable reference audit companions

These files contain synthetic records and scan inputs for the CLI guide.
The TypeScript expressions are scan inputs only; do not execute them.

Download the companion ZIP and extract it outside any existing repository.
Inside the extracted offline-variable-usage-audit directory, run git init --quiet.
Leave the fixture files untracked; do not run git add. The fixture/.gitignore
then excludes ignored.ts from the scanner's Git inventory. A tracked copy inside
the documentation repository would not reproduce that ignored-file example.

Use worksheet.csv for a blank review or compare worked-worksheet.csv with
export-pages.json. The worksheets do not establish causation or runtime status.
Follow the guide for provisioning the pinned CLI and isolated scan environment.
Never replace these synthetic files with real customer exports in a public copy.

LICENSE applies to these original companions only, not to the publisher's docs.
