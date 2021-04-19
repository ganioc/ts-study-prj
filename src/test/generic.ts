import { Comparable, RectangleInterface } from "../project/generic";

type ComparableRectangle = RectangleInterface & Comparable <RectangleInterface>;

class Rectangle implements ComparableRectangle {
    public width: number;
    public height: number;
    public constructor(width: number, height: number){
        this.width = width;
        this.height = height;
    }
    public equals(value: Rectangle){
        return value.width === this.width && value.height === this.height;
    }
}

interface CircleInterface{
    radius: number;
}

type ComparableCircle = CircleInterface & Comparable<CircleInterface>;

class Circle implements ComparableCircle{
    public radius: number;
    public constructor(radius: number){
        this.radius = radius;
    }
    public equals(value: CircleInterface):boolean{
        return value.radius === this.radius;
    }
}

const circle = new Circle(5);
const circle1 : CircleInterface = {radius:12};

console.log(circle.equals(circle1));
