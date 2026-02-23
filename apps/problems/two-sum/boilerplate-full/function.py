## USER_CODE_HERE ##

import sys
input_data = list(map(int, sys.stdin.read().strip().split()))

a = input_data[0]
b = input_data[1]

result = twoSum(a, b)
print(result)
