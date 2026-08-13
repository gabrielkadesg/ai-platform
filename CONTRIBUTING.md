# Contributing to AI Platform

## Development Setup

1. Fork the repository
2. Clone your fork
3. Follow instructions in root README.md
4. Create a branch: `git checkout -b feature/your-feature`

## Code Standards

### TypeScript
- Use strict mode
- No `any` types without justification
- Proper error handling

### Commit Messages
```
type: short description

type: feat, fix, docs, style, refactor, test, chore
```

### Pull Requests
- Describe what changed and why
- Reference related issues
- Ensure all tests pass
- Update documentation

## Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage
```

## Code Review Checklist

- [ ] Code follows style guide
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes
- [ ] Performance impact considered

## Feature Development

### Adding New Route

1. Create route file in `backend/src/routes/`
2. Add service methods in `backend/src/services/`
3. Add types in `backend/src/types/`
4. Register route in `backend/src/index.ts`

### Adding New Component

1. Create component in `frontend/components/`
2. Add types in `frontend/types/`
3. Update store if needed
4. Add tests

## Documentation

- Update README.md
- Add JSDoc comments
- Update ARCHITECTURE.md
- Add examples in code

## Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create git tag
4. Create GitHub release
5. Deploy to production

## Support

- Issues: GitHub Issues
- Discussions: GitHub Discussions
- Security: Report privately to maintainer
