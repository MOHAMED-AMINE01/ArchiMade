
import os

filepath = r'c:\ALTERNANCE\ArchiMade\src\components\ArchiMadeLanding.tsx'
with open(filepath, 'rb') as f:
    data = f.read()

# Replace literal \n (backslash + n) with actual newline \n
# backslash is 0x5C, n is 0x6E
data = data.replace(b'\\n', b'\\n') # Wait, this is the same.
# I want to replace the characters \ and n with a newline.
# In Python string: "\\n" is backslash and n. "\n" is newline.
# In bytes: b'\\n' is backslash and n. b'\n' is newline.

data = data.replace(b'\\n', b'\n')

with open(filepath, 'wb') as f:
    f.write(data)

print("Fixed literal newlines in bytes.")
