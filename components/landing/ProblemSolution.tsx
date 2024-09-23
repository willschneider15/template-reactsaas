import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MdArrowRight, MdArrowDownward } from "react-icons/md";

export default function ProblemSolution() {
    return (
        <section className="w-full pb-32 overflow-hidden text-foreground">
            <div className="container grid gap-8 px-4 md:px-6 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">The Problem We Solve</h2>
                <div className="grid md:grid-cols-5 items-center">
                    <Card className="flex flex-col justify-between bg-card border-border md:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold">Current Challenges</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-2">
                                {/* TODO: List 3 negative consequences of the status quo */}
                                <li>[Negative consequence 1]</li>
                                <li>[Negative consequence 2]</li>
                                <li>[Negative consequence 3]</li>
                            </ul>
                        </CardContent>
                    </Card>
                    <div className="flex justify-center items-center md:col-span-1 py-4 md:py-0">
                        <MdArrowRight className="hidden md:block h-8 w-8 text-primary animate-pulse" />
                        <MdArrowDownward className="md:hidden h-8 w-8 text-primary animate-pulse" />
                    </div>
                    <Card className="flex flex-col justify-between bg-card border-border md:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold">Our Solution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-2">
                                {/* TODO: List 3 positive benefits of your solution */}
                                <li>[Positive benefit 1]</li>
                                <li>[Positive benefit 2]</li>
                                <li>[Positive benefit 3]</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}