import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IdpHelperService {
  private filesResult$: Subject<any> = new Subject<any>();
  filesResult = this.filesResult$.asObservable();
  private subjectsResult$: Subject<any> = new Subject<any>();
  subjectsResult = this.subjectsResult$.asObservable();
  private ardsResult$: Subject<any> = new Subject<any>();
  ardsResult = this.ardsResult$.asObservable();
  private isArdTab$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isArdTab = this.isArdTab$.asObservable();

  addFileResult(result: any) {
    this.filesResult$.next(result);
  }

  addSubjectResult(result: any) {
    this.subjectsResult$.next(result);
  }

  addArdsResult(result: any) {
    this.ardsResult$.next(result);
  }

  isArdTabSelected(result:any) {
    this.isArdTab$.next(result);
  }

   prepareDataForGrid(gridData: any[]) {
    gridData.forEach((allData:any) => {
            allData['checked'] = false;
            allData.StudyNumber = allData.StudyNumber ? allData.StudyNumber : '-';
            allData.StudyIndication = allData.StudyIndication ? allData.StudyIndication : '-';
            allData.StudyThemeMolecule = allData.StudyThemeMolecule ? allData.StudyThemeMolecule : '-';  
            allData.StudyPhase = allData.StudyPhase ? allData.StudyPhase : '-';  
            allData.StudyType = allData.StudyType ? allData.StudyType : '-';  
            allData.StudyScientificArea = allData.StudyScientificArea ? allData.StudyScientificArea : '-';  
            allData.StudyStatus = allData.StudyStatus ? allData.StudyStatus : '-';  
            allData.StudyAcronym = allData.StudyAcronym ? allData.StudyAcronym : '-';  
            allData.StudyThemeNumber = allData.StudyThemeNumber ? allData.StudyThemeNumber : '-';  
            allData.SubjectEnrollmentSiteId = allData.SubjectEnrollmentSiteId ? allData.SubjectEnrollmentSiteId : '-';  
            allData.SubjectEthnicity = allData.SubjectEthnicity ? allData.SubjectEthnicity : '-';  
            allData.SubjectRace = allData.SubjectRace ? allData.SubjectRace : '-';  
            allData.SubjectSex = allData.SubjectSex ? allData.SubjectSex : '-';  
            allData.VisitAge = allData.VisitAge ? allData.VisitAge : '-'; 
            allData.AcquistionParentsProjects = allData.AcquistionParentsProjects ? allData.AcquistionParentsProjects : '-';            
            allData.DicomAcquisitionDate = this.checkDate(allData.DicomAcquisitionDate);            
            allData.DicomAcquisitionTime = allData.DicomAcquisitionTime ? allData.DicomAcquisitionTime : '-';            
            allData.DicomBodypartexamined = allData.DicomBodypartexamined ? allData.DicomBodypartexamined : '-';            
            allData.FileModality = allData.FileModality ? allData.FileModality : '-';            
            allData.SubjectID = allData.SubjectID ? allData.SubjectID : '-';     
            allData.FileName = allData.FileName ? allData.FileName : '-';            
            allData.File_Unq_ID = allData.File_Unq_ID ? allData.File_Unq_ID : '-';    
    }); 
    return gridData;
  }

  checkDate(date: number) {
    let dateData = '-';
    if (date && !isNaN(Number(date))) {
      dateData = this.formatDate(date);
    }
    return dateData
  }

  formatDate(date: number) {
    const dateStr = date.toString()
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8)
    const formatDate = `${year}/${month}/${day}`;
    return formatDate;
  }
}
