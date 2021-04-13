import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ParticipantsService } from 'src/app/services/participants.service';
import { Participants } from 'src/shared/participants.models';

@Component({
  selector: 'app-adm-participants',
  templateUrl: './adm-participants.component.html',
  styleUrls: ['./adm-participants.component.css']
})
export class AdmParticipantsComponent implements OnInit {

  public participants: Participants[]
  public participant = new Participants()


  public formulario: FormGroup = new FormGroup({
    'name': new FormControl(null),
    'userName': new FormControl(null),
    'password': new FormControl(null),
    'email': new FormControl(null),
    'address': new FormControl(null),
    'phone': new FormControl(null),
  })




  constructor(private participantsService: ParticipantsService) { }

  ngOnInit(): void {
    this.participantsService.getParticipants().then((result) => {
      this.participants = result
    })

  }




  public createParticipant(): void {
    this.participant = this.valuesFromFrom()
    
  
    this.participantsService.createParticipant(this.participant).subscribe((response)=>{
      console.log(response);
    })
    
  }

  public atualizarCliente(): void {
    console.log("Atualizando");
    console.log(this.participant)
  }

  public excluirCliente(): void {
    console.log("Excluindo");
    console.log(this.participant)

  }
  public updateClient() {
    console.log("Atualizando");
    console.log(this.participant)


  }


  public valuesFromFrom(): Participants {
    let participantFromForm = new Participants()
    participantFromForm.name = this.formulario.value.name
    participantFromForm.userName = this.formulario.value.userName
    participantFromForm.password = this.formulario.value.password
    participantFromForm.email = this.formulario.value.email
    participantFromForm.address = this.formulario.value.address
    participantFromForm.phone = this.formulario.value.phone
    return participantFromForm
  }

  public edit(participant) {
    this.participant = participant
    this.formulario.controls['name'].setValue(this.participant.name)
    this.formulario.controls['userName'].setValue(this.participant.userName)
    this.formulario.controls['email'].setValue(this.participant.email)
    this.formulario.controls['phone'].setValue(this.participant.phone)
    this.formulario.controls['address'].setValue(this.participant.address)


  }
}
