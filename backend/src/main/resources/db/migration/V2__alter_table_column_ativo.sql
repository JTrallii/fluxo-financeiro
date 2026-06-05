


ALTER TABLE fluxo_financeiro.usuarios
    ADD COLUMN IF NOT EXISTS ativo BOOLEAN;

UPDATE fluxo_financeiro.usuarios
    SET ativo = TRUE
    WHERE ativo IS NULL;

ALTER TABLE fluxo_financeiro.usuarios
    ALTER COLUMN ativo SET NOT NULL;

ALTER TABLE fluxo_financeiro.usuarios
    ALTER COLUMN ativo SET DEFAULT TRUE;