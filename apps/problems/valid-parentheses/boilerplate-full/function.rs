use std::io::{self, Read};

## USER_CODE_HERE ##

fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let mut iter = input.split_whitespace();

    let s: String = iter.next().unwrap().to_string();

    let result = isValid(s);
    println!("{}", result);
}
