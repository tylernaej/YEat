"""empty message

Revision ID: bded20a01e1e
Revises: ffdc0a98111c
Create Date: 2022-09-16 14:14:36.307410

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bded20a01e1e'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('amenities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('businesses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=100), nullable=False),
    sa.Column('phone', sa.String(length=15), nullable=False),
    sa.Column('website', sa.String(length=50), nullable=True),
    sa.Column('address', sa.String(length=50), nullable=False),
    sa.Column('city', sa.String(length=50), nullable=False),
    sa.Column('state', sa.String(length=50), nullable=False),
    sa.Column('zipcode', sa.String(length=50), nullable=False),
    sa.Column('country', sa.String(length=50), nullable=False),
    sa.Column('latitude', sa.Integer(), nullable=False),
    sa.Column('longitude', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=50), nullable=False),
    sa.Column('price_range', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('business_amenities',
    sa.Column('business_id', sa.Integer(), nullable=False),
    sa.Column('amenity_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['amenity_id'], ['amenities.id'], ),
    sa.ForeignKeyConstraint(['business_id'], ['businesses.id'], ),
    sa.PrimaryKeyConstraint('business_id', 'amenity_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('business_amenities')
    op.drop_table('businesses')
    op.drop_table('amenities')
    # ### end Alembic commands ###
