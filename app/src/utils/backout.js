export function backout(amount) {
    return (t) => --t * t * ((amount + 1) * t + amount) + 1;
}