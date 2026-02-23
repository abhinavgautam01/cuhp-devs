#include <iostream>
using namespace std;

## USER_CODE_HERE ##

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    int a; cin >> a;
    int b; cin >> b;

    auto result = twoSum(a, b);
    cout << result;
    return 0;
}