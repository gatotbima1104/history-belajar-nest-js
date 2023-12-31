import { Controller, Get } from "@nestjs/common";
import { CourseService } from "./course.service";

@Controller('course')
export class CourseController{

    constructor(private courseService: CourseService){}

    @Get()
    getHello(){
        return this.courseService.getHello()
    }
}