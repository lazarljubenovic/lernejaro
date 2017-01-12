import {GeometryObject} from '../../../planimetryts/geometry-objects/geometry-object';

export class DestructImpossibleError extends Error {

    constructor(message: string = "Destruction impossible") {
        super(message);
    }

}

export interface Strategy {
    destruct: any;
    reconstruct: any;
}


export abstract class GeometryObjectController {

    protected strategies: Map<string, Strategy> = new Map();

    public getStrategy(strategyName: string): Strategy {
        return this.strategies.get(strategyName);
    }

    public getStrategyNames(): string[] {
        return Array.from(this.strategies.keys());
    }

    public abstract getGeometryObject(): GeometryObject;

    public destruct(strategyName: string): any {
        const destructFunction = this.getStrategy(strategyName).destruct;
        return destructFunction(this.getGeometryObject());
    }

    public reconstruct(strategyName: string, object: any): GeometryObject {
        const reconstructFunction = this.getStrategy(strategyName).reconstruct;
        return reconstructFunction(object);
    }

}
