export class Utils {
    static newid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c: any) {
            const r = (Math.random() * 16) | 0,
                v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }

    static getRandom(max) {
        return Math.random() * Math.floor(max);
    }

    static getRandomMinMax(min, max) {
        return  Math.floor(Math.random() * (max - min) + min);
    }

    static RandomMinMax(min, max) {
        return min + Math.random() * (max - min);
    }
}
