export type PrimitiveOptions = {
  className?: string;
  attrs?: Record<string, string>;
};

function attrString(attrs?: Record<string, string>): string {
  if (!attrs) return '';
  return Object.entries(attrs)
    .map(([key, value]) => ` ${key}="${value}"`)
    .join('');
}

export function stack(content: string, options: PrimitiveOptions = {}): string {
  const klass = [options.className, 'ui-stack'].filter(Boolean).join(' ');
  return `<div class="${klass}"${attrString(options.attrs)}>${content}</div>`;
}

export function inline(content: string, options: PrimitiveOptions = {}): string {
  const klass = [options.className, 'ui-inline'].filter(Boolean).join(' ');
  return `<div class="${klass}"${attrString(options.attrs)}>${content}</div>`;
}

export function cluster(content: string, options: PrimitiveOptions = {}): string {
  const klass = [options.className, 'ui-cluster'].filter(Boolean).join(' ');
  return `<div class="${klass}"${attrString(options.attrs)}>${content}</div>`;
}

export function center(content: string, options: PrimitiveOptions = {}): string {
  const klass = [options.className, 'ui-center'].filter(Boolean).join(' ');
  return `<div class="${klass}"${attrString(options.attrs)}>${content}</div>`;
}

export function sidebar(side: string, main: string, options: PrimitiveOptions = {}): string {
  const klass = [options.className, 'ui-sidebar'].filter(Boolean).join(' ');
  return `<div class="${klass}"${attrString(options.attrs)}><aside>${side}</aside><main>${main}</main></div>`;
}
