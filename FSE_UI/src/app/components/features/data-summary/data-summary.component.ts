import { Component } from '@angular/core';
// import study from '../../../../assets/images/Outlined-folder_shared.svg';

@Component({
  selector: 'data-summary',
  templateUrl: './data-summary.component.html',
  styleUrl: './data-summary.component.scss',
})
export class DataSummaryComponent {

    progressCssStyle: any = { "background": "#1b84dd" };

    public summary: Array<{
      icon: any,
      name: string;
      value: string;
      progressCssStyle:any,
      progressValue: number
    }> = [
        { icon: 'studies',name: "Studies", value: '350', progressCssStyle: { "background": "#1b84dd" } , progressValue: 47 },
        { icon: "subjects", name: "Subjects", value: '50k' , progressCssStyle: { "background": "#FF7D29" } , progressValue: 77},
        { icon: "attach-file", name: "Files", value: '150k', progressCssStyle: { "background": "#87D4C4" } , progressValue: 75 },
        { icon: "sessions", name: "Sessions", value: '650', progressCssStyle: { "background": "#FFDA6C" } , progressValue: 50 },
        { icon: "acquisitions", name: "Acqusitions", value: '235', progressCssStyle: { "background": "#E085FC" } , progressValue: 55},
      ];

  public sources: Array<{ 
    name: string;
  }> = [
      { name: "GIP" },
      { name: "RWD" },
      { name: "OMICS" },
    ];

    public modality: Array<{ 
      name: string;
    }> = [
        { name: "CT" },
        { name: "MRI" },
        { name: "OCT" },
      ];

}
