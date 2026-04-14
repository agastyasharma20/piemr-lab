with open(r'c:\Users\Lenovo\OneDrive\Desktop\piemr\src\pages\ADA\ADALabDetails.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the quiz block start (line 479 = index 478) and end (line 579 = index 578)
# Find '})()}' which ends the quiz block
quiz_start = None
quiz_end = None
for i, line in enumerate(lines):
    if '{activeTab === \'quiz\'' in line and quiz_start is None:
        quiz_start = i
    if '})()}' in line and quiz_start is not None and quiz_end is None:
        quiz_end = i

print(f"Quiz block: lines {quiz_start+1} to {quiz_end+1}")

# Extract the quiz block
quiz_block_lines = lines[quiz_start:quiz_end+1]

# Remove quiz block from current position
remaining = lines[:quiz_start] + lines[quiz_end+1:]

# Find the new insertion point: after "            )}" which closes compiler tab
# That is after line 582 in original = now search for:
# We need it after the compiler closing: search for "            )}\n          </motion.div>"
new_insert = None
for i, line in enumerate(remaining):
    if line.strip() == ')}'  and i > 470:
        # check if next line is motion.div
        for j in range(i+1, min(i+5, len(remaining))):
            if '</motion.div>' in remaining[j]:
                new_insert = i + 1  # insert after this )}
                break
        if new_insert:
            break

print(f"Insert after line: {new_insert+1}")

if quiz_start is not None and quiz_end is not None and new_insert is not None:
    final = remaining[:new_insert] + quiz_block_lines + remaining[new_insert:]
    with open(r'c:\Users\Lenovo\OneDrive\Desktop\piemr\src\pages\ADA\ADALabDetails.tsx', 'w', encoding='utf-8') as f:
        f.writelines(final)
    print('SUCCESS: Quiz block repositioned correctly')
else:
    print('FAILED')
