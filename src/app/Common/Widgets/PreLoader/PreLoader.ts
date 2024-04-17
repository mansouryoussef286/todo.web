import { Component, Input, OnInit } from '@angular/core';
import { LoaderComponent } from '../Loader/Loader';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-preloader',
    standalone: true,
    templateUrl: './PreLoader.html',
    styleUrls: ['PreLoader.scss'],
    imports: [CommonModule, LoaderComponent]
})
export class PreLoaderComponent implements OnInit {
    @Input('Loaded') Loaded: boolean = false;

    constructor() { }

    ngOnInit() { }
}
