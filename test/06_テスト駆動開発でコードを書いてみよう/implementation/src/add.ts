export const add = (...nums: number[]) => {
    return nums.reduce(
        (prev, curr) => prev + curr
    )
};
