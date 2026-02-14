import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[uiStack], [uiInline], [uiCluster], [uiCenter]'
})
export class UiLayoutDirective {
  @Input() uiStack = false;
  @Input() uiInline = false;
  @Input() uiCluster = false;
  @Input() uiCenter = false;

  @HostBinding('class.ui-stack')
  get stackClass(): boolean {
    return this.uiStack !== false;
  }

  @HostBinding('class.ui-inline')
  get inlineClass(): boolean {
    return this.uiInline;
  }

  @HostBinding('class.ui-cluster')
  get clusterClass(): boolean {
    return this.uiCluster;
  }

  @HostBinding('class.ui-center')
  get centerClass(): boolean {
    return this.uiCenter;
  }
}
