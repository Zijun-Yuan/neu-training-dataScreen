declare module '@/api/dataScreen' {
    export function leftTopData(): Promise<any>;
    export function leftCenterData(): Promise<any>;
    export function leftBottomData(): Promise<any>;
    export function centerTopData(data: any): Promise<any>;
    export function centerBottomData(): Promise<any>;
    export function rightTopData(): Promise<any>;
    export function rightCenterData(): Promise<any>;
    export function rightBottomData(): Promise<any>;
    // 如果有其他导出函数，也需要在这里声明
}
