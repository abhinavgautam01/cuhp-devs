## USER_CODE_HERE ##

import sys
input_data = list(map(int, sys.stdin.read().strip().split()))

s = input_data[0]

result = isValid(s)
print(result)
