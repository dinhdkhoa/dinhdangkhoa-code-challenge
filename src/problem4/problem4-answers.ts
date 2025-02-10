const sum_to_n_a = (n: number): number => {
    let sum = 0
    while(n > 0){
      sum = sum + n--
    }
    return sum
}

const sum_to_n_b = (n: number): number => {
    return Array.from({ length: n + 1 }, (_, i) => i).reduce((accumulator, currentValue) => accumulator + currentValue,0)
}

const sum_to_n_c = (n: number): number => {
    return (n * (n + 1)) / 2; 
}