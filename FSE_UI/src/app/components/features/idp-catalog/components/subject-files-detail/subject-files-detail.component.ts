import { Component, OnInit } from '@angular/core';
import idpSubjectFilesColumns from '../../../../../../assets/columnDefinition/idp-subject-files-columns.json';
import { PaginationEto } from '../../../../models/pageRequest';
import { chevronDownIcon, chevronUpIcon, SVGIcon } from '@progress/kendo-svg-icons';
import { IdpRestService } from '../../../../services/idp-rest.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subject-files-detail',
  templateUrl: './subject-files-detail.component.html',
  styleUrl: './subject-files-detail.component.scss'
})
export class SubjectFilesDetailComponent implements OnInit {

  visitsData: any[] = [];
  gridColumns: any = idpSubjectFilesColumns;
  pagination!: PaginationEto;
  arrowDown: SVGIcon = chevronDownIcon;
  arrowUp: SVGIcon = chevronUpIcon;
  summary: any;
  summaryDetails: any;
  idpID: any;
  subjectID: any;
  response: any;
  indeterminate: boolean = false;
  testChcked: boolean = true;

  constructor(private idpRestService: IdpRestService, private route: ActivatedRoute) {
    this.idpID = this.route.snapshot.paramMap.get('idpId');
    this.subjectID = this.route.snapshot.paramMap.get('subjectId');
  }

  ngOnInit() {
    this.pagination = {
      "totalCount": 6,
      "page": 1,
      "pageSize": 20
    };
    this.idpRestService.getIdpSubjectFilesData(this.idpID, this.subjectID).subscribe((res: any) => {
      console.log('Files res', res);
      const response = res;
      this.visitsData = response.data.items.visits;
      this.summaryDetails = response.summary;
      this.mapJsonData();
      this.indeterminate = true;
    });
  }

  mapJsonData() {
    this.visitsData.forEach(ele => {
      ele['expanded'] = true;
      ele['checked'] = false;
      ele['indeterminate'] = false;
      ele.session.forEach((sessionEle: any) => {
        sessionEle['checked'] = false;
        sessionEle['indeterminate'] = false;
        sessionEle.files.forEach((fileEle: any) => {
          fileEle['checked'] = false;
        })
      });
    });
  }

  toggleVisit(event: any, visit: any) {
    this.visitsData.forEach((ele) => {
      if (ele.id === visit.id) {
        ele.checked = event.target.checked;
        // ele.indeterminate = visit.session.some((s: any) => s.checked);
        ele.session.forEach((childEle: any) => {
          childEle.checked = event.target.checked;
          // childEle.indeterminate = childEle.file.every((f: any) => f.checked);
          childEle.files.forEach((fileEle: any) => {
            fileEle.checked = event.target.checked;
          });
        });
      }
    });
  }

  toggleSession(event: any, visit: any, session: any) {
    this.visitsData.forEach(ele => {
      if (ele.id === visit.id) {
        visit.session.forEach((sessionEle: any) => {
          if (sessionEle.id == session.id) {
            sessionEle.checked = event.target.checked;
            ele.checked = visit.session.every((s: any) => s.checked);
            ele.indeterminate = !visit.checked && visit.session.some((s: any) => s.checked);
            sessionEle.files.forEach((fileEle: any) => {
              fileEle.checked = event.target.checked;
            });
          }
        });
      }
    });
  }

  toggleFile(event: any, visit: any, session: any, file: any) {
    this.visitsData.forEach(ele => {
      if (ele.id === visit.id) {
        visit.session.forEach((sessionEle: any) => {
          if (sessionEle.id == session.id) {
            sessionEle.files.forEach((fileEle: any) => {
              if (fileEle.file_unq_id == file.file_unq_id) {
                fileEle.checked = event.target.checked;
              }
              session.checked = session.files.every((f: any) => f.checked);
              sessionEle.indeterminate = !session.checked&& session.files.some((f: any) => f.checked);
              ele.checked = visit.session.every((s: any) => s.checked);
              ele.indeterminate = !visit.checked && visit.session.some((s: any) => s.checked);
            });
          }
        });
      }
    });
  }


  selectAll() {
    this.visitsData.forEach((ele) => {
      ele.checked = true;
      ele.indeterminate = false;
      ele.session.forEach((session: any) => {
        session.checked = true;
        session.indeterminate = false;
        session.files.forEach((file: any) => (file.checked = true));
      });
    });
  }

  collapseAll() {
    this.visitsData.forEach((visit) => (visit.expanded = false));
  }

  public onAction(action: any, visit: any): void {
    this.visitsData.forEach(ele => {
      if (ele.id === visit.id) {
        ele.expanded = action;
      }
    });
  }

  createArd(): void {
    console.log('createArd');
  }

  runAnalysis(): void {
    console.log('runAnalysis');
  }
}
