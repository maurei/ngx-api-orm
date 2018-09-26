import { Injectable } from '@angular/core';
import { Abstract } from '../abstract/adapters';

	/** @internal */
@Injectable({ providedIn: 'root' })
export class SimpleAdapter extends Abstract.SimpleAdapter {}
	/** @internal */
@Injectable({ providedIn: 'root' })
export class ToOneAdapter extends Abstract.ToOneAdapter {}
	/** @internal */
@Injectable({ providedIn: 'root' })
export class ToManyAdapter extends Abstract.ToManyAdapter {}
