import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from "@Angular/forms";

@Component({
  selector: 'app-firestore',
  templateUrl: './firestore.component.html',
  styleUrls: ['./firestore.component.scss']
})
export class FirestoreComponent implements OnInit {
  items$: Observable<any[]>;
  constructor(private firestore: AngularFirestore) {
    this.items$ = firestore.collection('items').valueChanges();
    console.log(this.items$, firestore.collection('items'));
  }

  ngOnInit(): void {
  }

  update() {
    this.firestore.collection('items').add({
            field: this.form.value.newValue
        })
        .then(res => {
            console.log(res);
            this.form.reset();
        })
        .catch(e => {
            console.log(e);
        })
    console.log("firestore updated");
  }

  form = new FormGroup({
    newValue: new FormControl('')
  })

}
