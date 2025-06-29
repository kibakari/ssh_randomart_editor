const galleryArts = [
  {
    art: `+---[RSA 　3072]---+
|          o..+*..|
|       o . o.O + |
|        + +.O X  |
|     . o =oB.B . |
|      + S.+o= .  |
|       + +E++.   |
|         ..=.+   |
|          . o.o  |
|             ..  |
+----[SHA256]-----+`,
    author: 'Alice',
    caption: "The Test's randomart image is:"
  },
  {
    art: `+---[RSA d3072]---+
|o.o.o   o        |
|+o + . . *       |
|+.o   o +.o.     |
| o + . = ++      |
|E + . o S  +     |
|     . =.*. o    |
|      .+*+.  .   |
|      .o=o....o  |
|        o+. o+   |
+----[SHA256]-----+`,
    author: 'Bob',
    caption: "The Test's randomart image is:"
  },
  {
    art: `+---[RSA 3072]----+
| ..oo..          |
|=o+..o B         |
|B*. + X *        |
|++.  @ X o       |
|*.o * X S        |
|== = = .         |
|..  o . .        |
|         E       |
|                 |
+----[SHA256]-----+`,
    author: 'Carol',
    caption: "The Carol's randomart image is:"
  },
  {
    art: `+---[RSA 3072]----+
|=B.o             |
|BEO o            |
|*+ @ .           |
|.oO B            |
|.X B .  S        |
|+ O o. o o       |
| o .  = o +      |
|  .  . o *       |
|   ..  .=oo      |
+----[SHA256]-----+`,
    author: 'Dave',
    caption: "The Dave's randomart image is:"
  },
  {
    art: `+---[RSA 3072]----+
|  o o*o .. +     |
|   +E+oo..+ o    |
|. o=..o o= +     |
|oo +.o .*.. +    |
|*.. +.+oS+ +     |
|== . ...=   .    |
|+ .      +       |
|        .        |
|                 |
+----[SHA256]-----+`,
    author: 'Eve',
    caption: "The Eve's randomart image is:"
  }
];

// Expose to other scripts
if (typeof window !== 'undefined') {
  window.galleryArts = galleryArts;
}
