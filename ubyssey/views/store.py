from django.http import HttpResponse, Http404
from django.template import loader
from django.shortcuts import render
from django.core.urlresolvers import reverse
from django.contrib.staticfiles.templatetags.staticfiles import static
#from dispatch.models import Product

class StoreTheme(object):
    """Views for the Ubyssey Store Ecommerce site"""


    def frontpage(self, request):
        """Frontpage View"""

        #TODO: get products
        # products = Products.objects.all()

        context = {
            'meta': {
                'title': 'The Ubyssey Store',
                'url': reverse('store-frontpage')
            }
        }

        return render(request, 'store/frontpage.html', context)

    def product(self, request, pk=None):
        """Individual Product View"""
        # try:
        #     product = Product.objects.get(id=pk)
        # except:
        #     raise Http404('Product does not exist')

        context = {
            'meta': {
                'title': 'The Ubyssey Store',
                'url': reverse('store-frontpage')
            }
        }

        return render(request, 'store/product.html', context)
