import { Bug } from "./Bug";
import { BugRecipe } from "./BugRecipe";
import { Criterio } from "./Criterio";
import { Precondicion } from "./Precondicion";

export interface BugCriterioPrecondicionRecipe{
    bug:Bug
    criterios: Criterio[]
    precondiciones:Precondicion[]
    bug_recipe:BugRecipe[]
}