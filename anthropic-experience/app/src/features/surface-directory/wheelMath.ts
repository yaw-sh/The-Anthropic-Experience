export function landingRotation(
  currentRotation: number,
  winnerIndex: number,
  count: number,
  turns = 5,
): number {
  if (!Number.isFinite(currentRotation) || !Number.isInteger(count) || count < 1) {
    throw new RangeError("A wheel needs at least one segment and a finite rotation.");
  }
  if (!Number.isInteger(winnerIndex) || winnerIndex < 0 || winnerIndex >= count) {
    throw new RangeError("Winner index must identify a visible wheel segment.");
  }
  if (!Number.isInteger(turns) || turns < 0) {
    throw new RangeError("Turns must be a non-negative integer.");
  }

  const segment = 360 / count;
  const landingAngle = (360 - (winnerIndex * segment + segment / 2)) % 360;
  const currentAngle = ((currentRotation % 360) + 360) % 360;
  return currentRotation + turns * 360 + ((landingAngle - currentAngle + 360) % 360);
}

export function wheelGradient(count: number): string {
  if (!Number.isInteger(count) || count < 1) throw new RangeError("A wheel gradient needs at least one segment.");
  const angle = 360 / count;
  const divider = Math.min(1, angle * 0.1);
  const degree = (value: number) => Number(value.toFixed(4));
  const stops = Array.from({ length: count }, (_, index) => {
    const start = degree(index * angle);
    const end = degree((index + 1) * angle);
    const fillEnd = degree(end - divider);
    const fill = index % 2 === 0 ? "#f1dba8" : "#7b213d";
    return `${fill} ${start}deg ${fillEnd}deg, #3d1930 ${fillEnd}deg ${end}deg`;
  });
  return `conic-gradient(from 0deg, ${stops.join(", ")})`;
}
