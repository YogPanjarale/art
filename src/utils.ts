export const repeat = (n: number, action: (n:number) => void) => {
    for (let i = 1; i <= n; i++) {
        action(n);
    }
}