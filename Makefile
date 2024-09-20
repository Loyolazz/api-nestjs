.PHONY: deploy_dev deploy_hml deploy_prod install_dep_dev install_dep_hml install_dep_prod prisma_migrate prisma_generate

deploy_dev:
	ls .env >> /dev/null 2>&1 || \cp .env.example .env
	docker-compose build --no-cache api db
	docker-compose up -d api db
	$(MAKE) prisma_migrate
	$(MAKE) prisma_generate
	$(MAKE) install_dep_dev

deploy_hml:
	\cp .env.homologa .env
	COMPOSE_HTTP_TIMEOUT=3000 docker-compose up -d -V --remove-orphans api db
	$(MAKE) prisma_migrate
	$(MAKE) prisma_generate
	$(MAKE) install_dep_hml

deploy_prod:
	\cp .env.prod .env
	COMPOSE_HTTP_TIMEOUT=3000 docker-compose up -d -V --remove-orphans api db
	$(MAKE) prisma_migrate
	$(MAKE) prisma_generate
	$(MAKE) install_dep_prod

install_dep_dev:
	docker exec api npm install
	docker exec api npm run build

install_dep_hml:
	docker exec api npm install
	docker exec api npm run build

install_dep_prod:
	docker exec api npm install --production
	docker exec api npm run build

prisma_migrate:
	docker exec api npx prisma migrate deploy

prisma_generate:
	docker exec api npx prisma generate
