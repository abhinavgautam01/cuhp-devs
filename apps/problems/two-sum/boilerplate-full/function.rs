use std::io::{self, Read};

## USER_CODE_HERE ##

fn main() {
    let mut input = String::new();
    io::stdin().read_to_string(&mut input).unwrap();
    let mut iter = input.split_whitespace();

    let a: i32 = iter.next().unwrap().parse().unwrap();
    let b: i32 = iter.next().unwrap().parse().unwrap();

    let result = twoSum(a, b);
    println!("{}", result);
}