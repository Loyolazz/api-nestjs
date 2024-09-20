.PHONY: deploy_dev deploy_prod prisma_migrate prisma_generate

deploy_dev:
    docker-compose -f docker-compose.dev.yml up --build -d
    $(MAKE) prisma_migrate
    $(MAKE) prisma_generate

deploy_prod:
    docker-compose -f docker-compose.prod.yml up --build -d
    $(MAKE) prisma_migrate
    $(MAKE) prisma_generate

prisma_migrate:
    docker-compose exec api npx prisma migrate deploy

prisma_generate:
    docker-compose exec api npx prisma generate