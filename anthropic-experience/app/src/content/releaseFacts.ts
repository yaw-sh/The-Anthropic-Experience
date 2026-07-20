import generatedFacts from "../generated/release-facts.json";
import { releaseFactSchema } from "./schemas";
import { z } from "zod";

export const releaseFacts = z.array(releaseFactSchema).length(5).parse(generatedFacts);
