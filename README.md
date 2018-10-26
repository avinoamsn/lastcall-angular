# [Last Call Website](http://lastcallforfood.com/)

[Staging Link](https://last-call-82705.firebaseapp.com/)

## Installation

After cloning, all necessary development modules can be installed with `npm install`.

- Compatible with node v8.12.0. (Noticeably slower compilatin at v8.10.0.)
- `firebase-tools` warns that google cloud functions should use node ~6. As far as I understand it, we haven't implemented any cloud-specific functions, so I don't think this is a problem. **TODO**: determine the relevancy of this warning.