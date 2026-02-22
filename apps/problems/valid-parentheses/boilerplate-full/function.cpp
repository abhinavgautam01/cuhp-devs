#include <iostream>
using namespace std;

## USER_CODE_HERE ##

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    string s; cin >> s;

    auto result = isValid(s);
    cout << result;
    return 0;
}