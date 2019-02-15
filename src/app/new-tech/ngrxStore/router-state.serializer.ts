//app/ngrx/router-state.serializer.ts

import { RouterStateSerializer, RouterReducerState } from '@ngrx/router-store';
import { Params, RouterStateSnapshot } from '@angular/router';

export interface IRouterStateUrl {
    url: string;
    params: any;
    queryParams: any;
}

export class CustomSerializer implements RouterStateSerializer<IRouterStateUrl> {

    serialize(routerState: RouterStateSnapshot): IRouterStateUrl {
        let route = routerState.root;

        while (route.firstChild) {
            route = route.firstChild;
        }

        const {
            url,
            root: { queryParams },
        } = routerState;
        const { params } = route;

        // Only return an object including the URL, params and query params
        // instead of the entire snapshot
        console.log({ url, params, queryParams })
        return { url, params, queryParams };
    }
}

export interface IDB {
    routerReducer: RouterReducerState<IRouterStateUrl>
}