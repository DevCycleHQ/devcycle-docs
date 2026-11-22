---
id: offline-variable-usage-audit
title: Audit variable references alongside product evidence
---

A product review may name a screen or behavior while the implementation uses a
feature-variable key. Keep the human association between those two records
separate from the source-reference inventory. This worksheet lets a reviewer
trace an explicitly selected product insight to an assigned variable key and
the file and line where that key appears.

The walkthrough uses an export from [ClosedLoop AI](https://closedloop.sh/).
Its [cursor-window and stable-ID conventions](https://closedloop.sh/docs/api-reference/conventions)
describe the input's IDs, titles and cursor window. You select the records and
assign the variable keys yourself. The CLI supplies static source references;
it cannot establish which insight caused a change or whether a variable exists
in a DevCycle environment.

## Keep the input window and code snapshot

Before scanning, save these details in your private working folder:

| Input | Record |
| --- | --- |
| Export scope | Source software, authorized workspace and export time |
| Window | First request's `updated_since`, each continuation cursor and response `sync_until` |
| Completion | Page count, final `has_more` and `next_cursor`; missing or inconsistent pages stay incomplete |
| Selected product insights | Full IDs and exact titles from the saved responses |
| Code | Repository snapshot, local changes and the files selected for scanning |
| Scan settings | CLI version, include/exclude patterns, client name and explicit aliases |
| Association | Your reason for assigning each selected insight to a variable key |

For a ClosedLoop AI export, retain the original response pages privately rather
than replacing them with the selected rows. The first request supplies
`updated_since` and `limit`; continuation requests supply `cursor` and `limit`.
Follow the returned `next_cursor` until `has_more` is false and `next_cursor` is
null. Keep the same `sync_until` across that window. Selected rows must belong
to the saved window, with `updated_since < updated_at <= sync_until`.

The accompanying synthetic `export-pages.json` contains one complete page and
three selected rows. A complete export window says nothing about whether the
selection covers every relevant product insight. If a requested ID is absent,
keep a missing-ID row; do not invent a title or silently discard it.

## Download the synthetic companions

Download the [companion ZIP](/examples/offline-variable-usage-audit/offline-variable-usage-audit.zip),
which includes the fixture directory and its `.gitignore`, the synthetic export,
both worksheets, reader instructions and the [original-file license](/examples/offline-variable-usage-audit/LICENSE.txt).
You can also download the [blank worksheet](/examples/offline-variable-usage-audit/worksheet.csv),
[worked worksheet](/examples/offline-variable-usage-audit/worked-worksheet.csv) and
[synthetic export](/examples/offline-variable-usage-audit/export-pages.json) individually.

Extract the ZIP into a fresh directory outside any existing Git repository.
For the isolated workspace used below, place the download at
`/task/offline-variable-usage-audit.zip`, then prepare the synthetic Git tree:

```sh
mkdir -p /task/audit
unzip /task/offline-variable-usage-audit.zip -d /task/audit
cd /task/audit/offline-variable-usage-audit
git init --quiet
```

Leave the fixture files untracked; do not run `git add`. This lets
`fixture/.gitignore` exclude `ignored.ts` from the scan. Scanning a Git-tracked
copy of that file inside the documentation repository would not reproduce the
ignored-file example. Use a new empty extraction directory for each walkthrough.
The TypeScript files are synthetic scan inputs and must not be executed.

## Run a credentialless static scan

This recipe was prepared for `@devcycle/cli@6.3.2` with Node22. The source behavior
is pinned at [DevCycle CLI commit745fc159](https://github.com/DevCycleHQ/cli/tree/745fc1591d703690c1abfc10827dff98c6e6bd7f).
Provision the public CLI package and dependencies separately before scanning.

Use an isolated environment with egress denied, no mounted credentials or user
profile, and a writable temporary directory. In the command below, `/task` is
that isolated workspace, `/task/runtime` contains the provisioned CLI,
`/task/tmp` exists, and `/task/offline-state` is an empty directory. Run from the
synthetic Git working tree containing `fixture/`.

```sh
env -i PATH=/usr/local/bin:/usr/bin:/bin TMPDIR=/task/tmp \
  /task/runtime/node_modules/.bin/dvc usages \
  --no-api --headless --format json \
  --auth-path /task/offline-state/absent-auth.yml \
  --config-path /task/offline-state/absent-user.yml \
  --repo-config-path /task/offline-state/absent-repo.yml \
  --include 'fixture/**/*.ts' --client-name auditClient \
  > variable-references.json 2> variable-references.stderr
```

The explicit configuration paths must remain absent. In this CLI version the
base command loads authentication/configuration before the usages command, so
`--no-api` alone is insufficient isolation. Do not add `--only-unused`: that
option invokes Management API behavior. Network denial prevents external
communication; it does not measure how many requests a process attempted.

Check the exit code, stderr and stdout separately. An empty working tree can
exit0 with a warning and no JSON output. That outcome means no usable inventory
was produced. A successfully parsed empty array is a different observation; it
still does not prove that every source file or variable was covered.

The scanner uses Git's file inventory. Ignored files, computed keys, unsupported
syntax and files outside the chosen patterns can remain unobserved. Retain
those limits with the result.

## Read match lines, then fill the worksheet

Each JSONMatch supplies a `key` and `references`. For each reference, preserve
`fileName`, `language` and `lineNumbers.start/end`. The separate
`codeSnippet.lineNumbers` spans the surrounding context, which can include
several calls. Use the reference's match range when filling a worksheet row.

The literal fixture contains these calls:

```ts
// Synthetic scan input; these expressions are never executed.
const help = auditClient.variableValue('export-help-panel', false);
const timezone = auditClient.variable('schedule-timezone-label', 'UTC');
```

The first command should locate `export-help-panel` at
`fixture/literal.ts:2` and `schedule-timezone-label` at
`fixture/literal.ts:3`. Match the full selected insight ID and exact title from
the export, then record your own association rationale. A shared word in a title
is not an automatic association.

The alias fixture has a constant key passed through an identifier. After
reviewing the source, you may explicitly supply that identifier's value:

```sh
env -i PATH=/usr/local/bin:/usr/bin:/bin TMPDIR=/task/tmp \
  /task/runtime/node_modules/.bin/dvc usages \
  --no-api --headless --format json \
  --auth-path /task/offline-state/absent-auth.yml \
  --config-path /task/offline-state/absent-user.yml \
  --repo-config-path /task/offline-state/absent-repo.yml \
  --include 'fixture/**/*.ts' --client-name auditClient \
  --var-alias 'dismissalKey=dismissal-confirmation' \
  > variable-references-with-alias.json 2> variable-references-with-alias.stderr
```

The alias assignment is operator-supplied evidence. It does not resolve the
other computed lookup in the fixture. Preserve its uncertainty.

The worked worksheet's product insight titles below refer to the full UUIDs in
`worked-worksheet.csv` and `export-pages.json`:

| Selected product insight | Operator-assigned key | Static reference | Review status |
| --- | --- | --- | --- |
| Export help panel hides keyboard instructions | `export-help-panel` | `fixture/literal.ts:2` | Literal match; review the behavior separately |
| Schedule screen omits the timezone label | `schedule-timezone-label` | `fixture/literal.ts:3` | Literal match; no runtime configuration claim |
| Dismissing an export clears the confirmation | `dismissal-confirmation` | `fixture/alias-dynamic.ts:2` | Explicit alias; preserve the assignment rationale |
| Requested ID absent from saved page | Unassigned | Unknown | Keep missing-ID status; retrieve authorized source before association |

Use the blank `worksheet.csv` for your own review. Keep one row per reference
when a key occurs in several locations, and retain selected insights without a
key, assigned keys without a match, and matches without a selected insight.
None of those cases is proof of an unused feature.

## Decide the next investigation

Use the worksheet to choose a concrete follow-up: inspect an ignored path,
resolve a dynamic key manually, obtain the missing export page, review the
behavior at the matched location, or leave the relationship unassigned. Keep
the original scan and your later decision separate so another reviewer can
reconstruct the association.

Product insight titles and IDs, repository paths and CLI snippets can contain
private information. Keep real exports and inventories local and share only
the rows the relevant owners authorize. The public walkthrough uses synthetic
records and code. This procedure evaluates source-reference coverage; feature
evaluation, targeting and rollout validation require their own evidence.

Contribution by ClosedLoop AI.
