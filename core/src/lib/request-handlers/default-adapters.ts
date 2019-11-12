import { Injectable } from '@angular/core';
import { Abstract } from './abstract-adapters';

@Injectable({ providedIn: 'root' })
export class SimpleAdapter extends Abstract.SimpleAdapter {}
@Injectable({ providedIn: 'root' })
export class ToOneAdapter extends Abstract.ToOneAdapter {}
@Injectable({ providedIn: 'root' })
export class ToManyAdapter extends Abstract.ToManyAdapter {}
