import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArdRestService } from '../../../../services/ard-rest.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ard-documentation-tab',
  templateUrl: './ard-documentation-tab.component.html',
  styleUrl: './ard-documentation-tab.component.scss',
})
export class ArdDocumentationTabComponent implements OnInit {
  @Input() ardResult: any;
  descriptionForm: FormGroup;
  isEditable = false;

  users = [
    {
      initials: 'AZ',
      name: 'Alyson Zorko',
      permission: 'read-write',
    },
    {
      initials: 'VF',
      name: 'Valery Freeman',
      permission: 'read-only',
    },
    {
      initials: 'JA',
      name: 'Jason Avikon',
      permission: 'admin',
    },
    {
      initials: 'BD',
      name: 'Brandon Decosta',
      permission: 'read-write',
    },
  ];

  insights = [
    {
      name: 'CAFE-14_ROSA-ALPHA_02_24_2024_1:42',
      status: 'inprogress',
      value: 400,
    },
    {
      name: 'CAFE-14_ROSA-ALPHA_02_24_2024_1:42',
      status: 'complete',
      value: 650,
    },
    {
      name: 'CAFE-14_ROSA-ALPHA_02_24_2024_1:42',
      status: 'error',
      value: 200,
    },
    {
      name: 'CAFE-14_ROSA-ALPHA_02_24_2024_1:42',
      status: 'complete',
      value: 450,
    },
  ];

  ardDetailsMapper = [
    {
      label: 'Clinical Phase',
      dbColumn: 'studyphase'
    },
    {
      label: 'Indication',
      dbColumn: 'studyindication'
    },
    {
      label: 'Scientific Area',
      dbColumn: 'studyscientificarea'
    },
    {
      label: 'Data Classification',
      dbColumn: ''
    }
  ]
  ardDetails: any[] = [];

  inclusionCriteria = [
    {
      label: 'Country',
      value: 'USA',
    },
    {
      label: 'Images',
      value: 'JPG',
    },
  ];

  exclusionCriteria = [];
  description = '';

  constructor(
    private fb: FormBuilder,
    private ardRestService: ArdRestService,
    private toastrService: ToastrService
  ) {
    this.descriptionForm = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(5000)]],
    });
  }

  ngOnInit(): void {
    this.mapArdDetails();
  }

  editDescription() {
    this.isEditable = true;
  }

  saveDescription(description: string) {
    this.isEditable = false;
    const ardId = this.ardResult?.data?.summary?.arduniqid;
    this.ardRestService
      .addDescriptionToArd(ardId, description)
      .subscribe((response: any) => {
        if (response && response?.status === 'success') {
          this.toastrService.success(response.message);
          this.descriptionForm.value.description = response.description;
          this.description = this.descriptionForm.value.description;
        }
      });
  }

  cancel() {
    this.isEditable = false;
    this.descriptionForm.reset({
      description: this.ardResult?.data.summary.description,
    });
  }

  mapArdDetails(): void {
    this.descriptionForm.setValue({description: this.ardResult?.data?.summary.description ?? ''});
    this.description = this.descriptionForm.value.description;
    const ardDetailResult = this.ardResult.data?.ard_study_details;
    this.ardDetailsMapper.forEach((ardDetailMap) => {
      this.ardDetails.push({
        label: ardDetailMap.label,
        value: ardDetailResult[ardDetailMap.dbColumn] ? ardDetailResult[ardDetailMap.dbColumn] : '-'
      });
    });
  }
}
