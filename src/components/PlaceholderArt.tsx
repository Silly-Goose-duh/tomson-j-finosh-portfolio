type Props = { variant: string; index: number };

export function PlaceholderArt({ variant, index }: Props) {
  return (
    <div className={`art-pattern art-pattern--${variant}`} aria-hidden="true">
      <div className="art-pattern__sun" />
      <div className="art-pattern__orbit art-pattern__orbit--one" />
      <div className="art-pattern__orbit art-pattern__orbit--two" />
      <div className="art-pattern__stripe" />
      <span className="art-pattern__serial">{String(index + 1).padStart(2, '0')}</span>
      <span className="art-pattern__cross">✳</span>
    </div>
  );
}
