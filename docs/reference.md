# Reference Notes

## Naming

Use `Brick`, `brickctl`, and `brick-sentinel` in user-facing documentation and internal examples. Keep API property names stable unless a compatibility migration is documented.

## Support bundle

When reporting an issue, include the Brick version, OS family and release, filesystem type, Sentinel preflight output, the relevant transaction ID, exact command or UI action, and the smallest useful log excerpt. Remove secrets, tokens, customer data, and private host addresses before sharing.

## Review standard

Documentation changes should be checked against the current source implementation, the generated frontend build, and the relevant smoke-test flow. When the implementation and the guide disagree, correct the guide or label the feature as roadmap work before publication.
