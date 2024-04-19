export function backoutEasing(amount) {
    return (t) => --t * t * ((amount + 1) * t + amount) + 1;
}