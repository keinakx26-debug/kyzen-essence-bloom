# Kyzen Cardamom Journey

Build a premium, cinematic, highly animated single-page website for a luxury Indian cardamom brand called KYZEN.

The website should feel like a combination of Apple product storytelling + Nike visual energy + luxury fragrance/food branding.

This is NOT a generic spice ecommerce website. It should feel like a premium global ingredient brand.

CORE BRAND

Brand: KYZEN

Tagline:
THE ESSENCE OF CARDAMOM

Products:

10g

20g

50g

100g

Visual identity:

Deep forest green

Almost-black green

Warm ivory

Subtle muted gold

Premium white typography

Avoid:

Bright red

Bright yellow

Cheap-looking gradients

Excessive borders

Generic ecommerce card layouts

Excessive text

Discount banners

Crowded navigation

The design must have lots of whitespace and large cinematic visuals.

TECHNOLOGY

Use:

React

Vite

Tailwind CSS

GSAP

GSAP ScrollTrigger

Three.js / React Three Fiber where appropriate

Lucide React icons

Use smooth scrolling.

Make the website fully responsive for:

Desktop

Tablet

Mobile

The website must run correctly in Replit without requiring paid services.

If a real 3D cardamom model is unavailable, create the visual using CSS/SVG/canvas/Three.js procedural geometry or use a clearly defined placeholder asset that can later be replaced.

Do NOT make the website dependent on an external image API.

Create a clean component structure.

MAIN EXPERIENCE

The most important feature of the website is this scroll-driven cinematic sequence:

Scroll → giant cardamom pod → pod opens → seeds appear → seeds transform into 10g packet → packet rotates → 20g → 50g → 100g → Choose Your Size

This sequence should occupy a large portion of the homepage.

The animation must feel intentional, smooth and premium.

Do not simply stack animations on top of each other.

Use GSAP ScrollTrigger to synchronize animations with scrolling.

SECTION 1 — HERO

Create a full-screen hero section.

Background:
Very dark forest green / almost black.

At the top:

KYZEN

Navigation:

SHOP
OUR STORY
CARDAMOM
CONTACT

Right side:
Cart icon

Keep navigation minimal.

Center of hero:

Large headline:

CARDAMOM,
ELEVATED.

Small supporting text:

Premium green cardamom, carefully selected and packed to preserve its natural aroma.

CTA:

EXPLORE CARDAMOM ↓

Behind/below the text, show one enormous premium green cardamom pod.

The pod should slowly rotate or subtly move with the mouse.

Add subtle floating particles.

The hero should feel cinematic, not like a normal ecommerce homepage.

SECTION 2 — CINEMATIC CARDAMOM ANIMATION

This is the signature feature.

Make this section approximately 500vh–700vh tall so the animation has enough scroll distance.

Pin the main visual while scrolling.

STAGE 1 — GIANT CARDAMOM POD

Show a huge cardamom pod in the center.

Text on the side:

01

THE POD

Small description:

"Where the journey begins."

As the user scrolls:

pod slowly rotates

camera gradually moves closer

background particles move subtly

lighting changes slightly

surrounding elements fade away

Do not make the animation too fast.

STAGE 2 — POD OPENS

As the user continues scrolling:

The cardamom pod should smoothly split/open.

Inside the pod reveal multiple cardamom seeds.

Use a smooth morphing/opening animation rather than suddenly hiding one image and showing another.

Text:

02

THE HEART OF CARDAMOM

Small text:

"Inside every pod lies its character."

Add subtle dust/aroma particles.

STAGE 3 — SEEDS FLOAT

Continue scrolling.

The seeds should slowly escape from the pod.

Create a 3D-like particle effect.

Seeds should:

float

rotate

move toward the center

respond slightly to scroll velocity

have depth

Text:

03

NATURAL AROMA

Small text:

"Distinctive. Warm. Unmistakable."

STAGE 4 — SEEDS TRANSFORM INTO THE 10G KYZEN PACKET

This transition is extremely important.

As the seeds move toward the center:

They should visually gather together.

The particles should then transform/morph into the shape of the KYZEN 10g package.

If actual package artwork is available in the project assets, use it.

Look for assets inside:

/public
/public/images
/public/assets

If no package image exists, create a temporary premium package mockup with:

dark green packet

KYZEN logo

muted gold details

"PREMIUM GREEN CARDAMOM"

"10g"

Do NOT invent a complicated logo.

Make it easy to replace the placeholder with the real KYZEN package image later.

The transformation should feel like:

CARDAMOM SEEDS → PARTICLES → PACKET

Text:

04

FROM POD TO PACK

STAGE 5 — PRODUCT ROTATION

Once the 10g packet has formed:

Keep the packet in the center.

Slowly rotate it 360 degrees.

Show:

Front
→ side
→ back
→ side
→ front

Use perspective and subtle lighting.

The packet should feel like a premium physical product being presented in a luxury product launch.

Add a subtle shadow underneath.

Text:

10G

PURE CARDAMOM.

Do not overwhelm the screen with text.

STAGE 6 — PRODUCT SIZE TRANSITION

After the 10g rotation, transition through the four available sizes:

10G → 20G → 50G → 100G

Do NOT simply instantly swap the images.

Use smooth cinematic transitions.

For example:

10g packet slowly moves backward and fades.

20g packet comes forward.

Then:

20g → 50g

Then:

50g → 100g

Each product should:

scale smoothly

rotate slightly

have depth

have realistic shadows

remain centered

feel like the same product family

Show the current size prominently.

Example:

10G

then

20G

then

50G

then

100G

The transition should feel like Apple changing product configurations.

SECTION 7 — CHOOSE YOUR SIZE

After the cinematic sequence finishes, transition into a clean product selection section.

Headline:

CHOOSE YOUR SIZE

Subheading:

The right amount for every ritual.

Create four elegant selectors:

10G
Everyday

20G
Essential

50G
Family

100G
Reserve

When the user clicks a size:

selected packet becomes the hero

packet smoothly animates into position

other packets become smaller/subtle

information updates without page reload

price area should be ready for future integration

Add:

ADD TO CART

button.

For now, use placeholder prices if real prices are not provided, but make them very easy to edit in one data object.

SECTION 8 — WHY KYZEN

Create a minimal editorial section.

Large typography:

WHY KYZEN

Then reveal three statements one by one while scrolling:

01
HAND SELECTED

02
PREMIUM GREEN CARDAMOM

03
AROMA SEALED

Use large numbers and minimal supporting text.

Each item should animate into view using GSAP.

SECTION 9 — THE ORIGIN

Create a full-width immersive section about the source of cardamom.

Headline:

FROM THE GREEN HILLS.

Supporting text:

"Carefully selected green cardamom, chosen for its appearance, aroma and character."

Use a premium plantation/cardamom visual.

If no real image is available, create an elegant dark visual placeholder that can later be replaced.

Add slow parallax movement.

SECTION 10 — THE RITUAL

Create a visually rich section showing how cardamom is used.

Four minimal categories:

TEA

COFFEE

DESSERTS

EVERYDAY

Each item should appear with a subtle hover animation.

Do not make this look like a recipe website.

Keep it editorial and luxurious.

SECTION 11 — FINAL BRAND MOMENT

End with a full-screen dark section.

Large KYZEN logo.

Text:

THE ESSENCE OF CARDAMOM

Small text:

"Made for the moments worth savouring."

CTA:

SHOP CARDAMOM

The cardamom pod from the beginning should subtly return in the background.

Create a visual loop:

POD → PACK → KYZEN

ANIMATION REQUIREMENTS

Animations are one of the most important parts of this website.

Use GSAP + ScrollTrigger extensively but intelligently.

Required effects:

Scroll-linked animations

Pinning

Parallax

Scale transitions

Rotation

Opacity transitions

Blur-to-sharp transitions

Particle movement

Product perspective

Smooth section transitions

Hover interactions

Magnetic CTA buttons

Subtle cursor interaction

Use easing such as:

power2.out
power3.out
expo.out

Avoid excessive bouncing.

Luxury websites should feel smooth and controlled.

MOUSE INTERACTION

On desktop:

The hero cardamom should subtly react to mouse movement.

The product packet should have a very subtle 3D tilt when hovered.

Buttons should have magnetic movement toward the cursor.

Do NOT make these effects exaggerated.

TYPOGRAPHY

Use a combination of:

Elegant serif for major editorial headlines.

Modern sans-serif for navigation, body text and product information.

Recommended fonts:

Cormorant Garamond or Playfair Display

combined with:

Inter or Manrope

Use large typography.

Example:

CARDAMOM,

ELEVATED.

should occupy a significant portion of the screen.

NAVIGATION BEHAVIOR

Navigation should remain minimal.

Desktop:

KYZEN | SHOP | OUR STORY | CARDAMOM | CONTACT | CART

On scroll:

Navigation becomes slightly smaller and gains a subtle translucent dark background.

Mobile:

Use:

KYZEN
MENU
CART

Create a smooth fullscreen mobile menu.

PRODUCT DATA

Create a centralized product data object such as:

products = [
{
size: "10g",
name: "Everyday",
price: "...",
image: "/images/kyzen-10g.png"
},
{
size: "20g",
name: "Essential",
price: "...",
image: "/images/kyzen-20g.png"
},
{
size: "50g",
name: "Family",
price: "...",
image: "/images/kyzen-50g.png"
},
{
size: "100g",
name: "Reserve",
price: "...",
image: "/images/kyzen-100g.png"
}
]

Make all product information easy to edit.

ASSET SUPPORT

Create an assets folder:

/public/images/

Support these future files:

kyzen-logo.png
cardamom-pod.png
cardamom-seed.png
kyzen-10g.png
kyzen-20g.png
kyzen-50g.png
kyzen-100g.png
plantation.jpg
tea.jpg
coffee.jpg
dessert.jpg

If the actual assets aren't available, use elegant placeholders.

IMPORTANT:

Build the website architecture so I can simply replace the files later without changing the React components.

PERFORMANCE

The animation must remain smooth.

Optimize:

Images

Canvas rendering

Three.js objects

ScrollTrigger calculations

Use requestAnimationFrame where appropriate.

Respect:

prefers-reduced-motion

For users who disable animation, provide a simplified static experience.

Do not load huge unnecessary libraries.

RESPONSIVE DESIGN

Desktop should be cinematic.

Tablet should retain the storytelling.

Mobile should NOT simply shrink the desktop version.

For mobile:

reduce animation complexity

keep the product centered

use shorter scroll sequences

maintain the same storytelling

make buttons thumb-friendly

keep typography readable

The main sequence should still be:

POD
→ OPEN
→ SEEDS
→ 10G
→ ROTATE
→ 20G
→ 50G
→ 100G
→ CHOOSE YOUR SIZE

CODE QUALITY

Create reusable components such as:

Hero
CardamomJourney
PodAnimation
SeedParticles
ProductReveal
ProductShowcase
SizeSelector
WhyKyzen
OriginSection
RitualSection
Footer

Keep animation logic modular.

Do not put the entire website into one React component.

Add comments around complicated GSAP/Three.js animation logic.

IMPORTANT FINAL REQUIREMENT

Before finishing:

Run the project.

Check for build errors.

Fix all console errors.

Check desktop responsiveness.

Check mobile responsiveness.

Verify the scroll animation works.

Verify the 10g → 20g → 50g → 100g transition works.

Verify buttons and navigation work.

Make sure there are no broken images.

Make sure the page looks premium even if real product assets haven't been uploaded yet.

Do not stop at creating a static mockup.

Actually implement the working animated website.

The final result should feel like a luxury cardamom product launch website, not a generic ecommerce template.

The single most important visual sequence is:

GIANT CARDAMOM POD
↓
POD OPENS
↓
SEEDS FLOAT OUT
↓
SEEDS TRANSFORM INTO KYZEN 10G PACKET
↓
PACKET ROTATES
↓
10G → 20G → 50G → 100G
↓
CHOOSE YOUR SIZE

Make this the centerpiece of the experience.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e6f74a8d-b3e1-4c76-9e10-f5c65ad2bd49).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
