The first requirement for the loan system was not “build a better interface”. It was “do not change the numbers”.

The saving group at my college had used spreadsheets for years. Every member understood the output. The interest rate was 10% per annum, calculated daily, with rules that had grown around the group’s habits. Some of those rules were not written down. They lived in formulas and in the memory of the person who maintained the workbook.

## The workbook was the source of truth

I could have designed a cleaner interest model. That would have been a failure. The system’s job was to preserve an existing agreement between people, not to improve it on their behalf.

So I treated the workbook as a specification:

1. Recreate historical calculations exactly.
2. Write tests around real loans, including the awkward ones.
3. Show the same numbers the group already trusted.
4. Add only what the spreadsheet could not do.

That last point became the real product. The spreadsheet could calculate. It could not prove who changed a payment, when, or why.

## Accountability is a feature

Every action that affects a loan or a payment goes into an audit log. The log is not decorative. It answers the question that used to start arguments: “Was this edited after the fact?”

The interface stayed plain. A desktop application, a small set of screens, and an Excel export for the reports members already knew how to read. Nobody needed to learn a new workflow to trust the result.

## What the project taught me

Two things have stayed with me.

First, adoption is not a design problem alone. People adopt software when it removes a specific fear. Here, the fear was losing track of money. The audit trail addressed that fear directly.

Second, “legacy” is often another word for “agreed”. When a process has survived for years, it contains decisions that are not visible in the code. Ask before replacing them.

The system has run on real money since 2023. That is a better review than any launch post.