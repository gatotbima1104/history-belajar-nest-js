import { Injectable } from "@nestjs/common";

@Injectable()
export class CourseService {
    getHello(){
        return "hello"
    }
}