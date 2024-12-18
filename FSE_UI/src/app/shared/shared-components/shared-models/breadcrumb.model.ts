export interface IBreadCrumb {
    label: string,
    value?: string,
    icon?: string,
    url: string;
    disableBreadcrumb: string;
    enableCustomRoute?: boolean;
  }