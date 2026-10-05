# Internal linking update (Oct 5, 2026)

Reviewed and approved by Jev (TypeSafe System One) before deployment. Strategy rules, each edit, revisions and the final go/no-go were all Jev decisions.

## Rules (Jev-approved)
- Pillar posts link out to 4–6 related posts, weakest posts first.
- Every live post has 3+ contextual inbound links; scheduled posts have 2+.
- Links only between topically related posts.
- 1–2 exact-match anchors per target; the rest are varied and descriptive; no single anchor used more than ~3 times.
- Never the same target twice in one post.
- Links to scheduled posts show as plain text until publish day (`gateLinks` in `src/lib/links.ts`).
- `npm run build` fails if any internal link is broken (`scripts/check-links.mjs`).
- Related Posts box and next-post popup rank by shared tags, then category, then newest, skipping posts already linked in the body.

## Link edits

- **C1** `how-to-clean-a-blender` → `how-to-clean-a-cloudy-blender-jar` anchor: “how to clean a cloudy blender jar”
- **C2** `how-to-clean-a-blender` → `blender-smells-like-burning` anchor: “why a blender smells like burning”
- **C4** `how-to-clean-a-blender` → `glass-vs-plastic-blender-jar` anchor: “glass blender jars over plastic”
- **C5** `how-to-clean-a-blender` → `remove-stains-from-plastic-blender-jar` anchor: “ways to remove stains from a plastic blender jar”
- **T1** `blender-types-explained` → `nice-cream-in-a-blender` anchor: “banana nice cream”
- **T3** `blender-types-explained` → `blender-wattage-guide` anchor: “blender wattage guide”
- **T4** `blender-types-explained` → `glass-vs-plastic-blender-jar` anchor: “glass vs. plastic blender jars”
- **T5** `blender-types-explained` → `blender-vs-food-processor` anchor: “blender vs. food processor”
- **L1** `smoothie-layering-order` → `blender-not-blending` anchor: “blender not blending checklist”
- **L2** `smoothie-layering-order` → `green-smoothie-that-doesnt-taste-like-grass` anchor: “green smoothie that doesn't taste like grass”
- **L3** `smoothie-layering-order` → `smoothie-without-banana` anchor: “smoothies without banana”
- **L5** `smoothie-layering-order` → `nice-cream-in-a-blender` anchor: “banana nice cream”
- **L6** `smoothie-layering-order` → `smoothie-freezer-packs` anchor: “smoothie freezer packs”
- **O1** `things-you-can-make-in-a-blender` → `blender-salsa-and-sauces` anchor: “blender salsa and sauce recipes”
- **O2** `things-you-can-make-in-a-blender` → `blender-pancake-batter` anchor: “blender pancake batter recipe”
- **O3** `things-you-can-make-in-a-blender` → `nice-cream-in-a-blender` anchor: “making nice cream in a blender”
- **O4** `blender-not-blending` → `nice-cream-in-a-blender` anchor: “nice cream”
- **O5** `blender-vs-food-processor` → `blender-pancake-batter` anchor: “Pancake and crêpe batter”
- **O6** `blender-vs-food-processor` → `blender-salsa-and-sauces` anchor: “blender salsa recipes”
- **O7** `remove-stains-from-plastic-blender-jar` → `blender-salsa-and-sauces` anchor: “fresh salsa or marinara”
- **O8** `remove-stains-from-plastic-blender-jar` → `glass-vs-plastic-blender-jar` anchor: “glass and plastic blender jars compare”
- **O10** `how-to-make-a-blender-quieter` → `immersion-blender-guide` anchor: “what an immersion blender is used for”
- **O12** `blender-smells-like-burning` → `how-long-do-blenders-last` anchor: “how long blenders last”
- **A1** `blender-accessories-worth-buying` → `blender-types-explained` anchor: “different types of blenders”
- **A2** `blender-smells-like-burning` → `blender-types-explained` anchor: “which type of blender to buy”
- **A3** `blender-vs-food-processor` → `blender-types-explained` anchor: “types of blenders”
- **A4** `can-you-sharpen-blender-blades` → `how-long-do-blenders-last` anchor: “how long blenders last, and when to repair or replace yours”
- **A5** `frozen-coffee-drinks-in-a-blender` → `blender-types-explained` anchor: “personal and high-performance blenders compare”
- **A6** `glass-vs-plastic-blender-jar` → `blender-types-explained` anchor: “the main types of blenders explained”
- **A7** `how-long-do-blenders-last` → `blender-types-explained` anchor: “blender types guide”
- **A9** `smoothie-without-banana` → `blender-types-explained` anchor: “what type of blender you need”
- **A10** `things-you-can-make-in-a-blender` → `blender-types-explained` anchor: “which kind of blender handles which jobs”
- **A11** `blender-salsa-and-sauces` → `how-to-clean-a-blender` anchor: “self-clean the blender with warm water and a drop of dish soap”
- **A12** `can-you-crush-ice-in-a-blender` → `how-to-clean-a-blender` anchor: “clean it properly after each use”
- **A13** `green-smoothie-that-doesnt-taste-like-grass` → `how-to-clean-a-blender` anchor: “how to clean a blender”
- **A14** `high-protein-smoothies-without-protein-powder` → `how-to-clean-a-blender` anchor: “quick self-cleaning trick”
- **A16** `nice-cream-in-a-blender` → `how-to-clean-a-blender` anchor: “run a quick soapy self-clean”
- **A17** `smoothie-freezer-packs` → `how-to-clean-a-blender` anchor: “step-by-step blender cleaning guide”
- **A18** `smoothie-without-banana` → `how-to-clean-a-blender` anchor: “how to clean your blender properly”
- **A20** `frozen-coffee-drinks-in-a-blender` → `smoothie-layering-order` anchor: “layering a smoothie”
- **A21** `green-smoothie-that-doesnt-taste-like-grass` → `smoothie-layering-order` anchor: “the order to add smoothie ingredients”
- **A22** `how-long-do-blenders-last` → `smoothie-layering-order` anchor: “why ingredient order matters”
- **A23** `how-to-make-a-smoothie-bowl` → `smoothie-layering-order` anchor: “layering smoothie ingredients”
- **T2** `blender-types-explained` → `immersion-blender-guide` anchor: “immersion blender buying guide”
- **A8** `how-to-make-a-smoothie-bowl` → `blender-types-explained` anchor: “how conventional and high-performance blenders differ”
- **O11** `blender-accessories-worth-buying` → `homemade-baby-food-in-a-blender` anchor: “homemade baby food”
- **O13** `how-to-make-nut-butter-in-a-blender` → `blender-accessories-worth-buying` anchor: “narrow blender spatula”
- **SB1** `how-to-make-a-smoothie-bowl` → `blender-accessories-worth-buying` anchor: “blender accessories worth buying”
- **A15** `homemade-baby-food-in-a-blender` → `how-to-clean-a-blender` anchor: “quick soap-and-warm-water self-clean”
- **A19** `blender-salsa-and-sauces` → `smoothie-layering-order` anchor: “smoothie layering guide”
- **C3** `how-to-clean-a-blender` → `blender-gasket-guide` anchor: “how to clean a blender gasket”
- **L4** `smoothie-layering-order` → `how-to-make-a-smoothie-bowl` anchor: “thick smoothie bowl”
- **O9** `blender-not-blending` → `blender-accessories-worth-buying` anchor: “blender accessories worth buying”

## Also
- 12 duplicate same-target links removed (second occurrence unlinked; sentence lightly reworded so it doesn't point at a missing link).
- 2 more “60-second blender cleaning guide” anchors varied (blender-vs-food-processor, how-to-make-nut-butter-in-a-blender).
